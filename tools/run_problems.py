#!/usr/bin/env python3

import json
import subprocess
import pathlib
import sys
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
PROBLEMS_JSON = ROOT / "problems" / "problems.json"
PROBLEMS_SRC = ROOT / "problems" / "src"
OUTPUT_JSON = ROOT / "web" / "data" / "problems.generated.json"
OUTPUT_JSON_INDEX = ROOT / "web" / "data" / "problems.index.json"

MAKE_CMD = ["make"]
TIMEOUT = 2  # seconds

ANSI_PATTERN = re.compile(r'(\x1b\[[0-9;]*[m|K])')

ANSI_COLOR_MAP = {
    "31": "red",
    "33": "yellow",
    "36": "cyan",
    "32": "green",
}

ANSI_STYLE_MAP = {
    "01": "bold",
    "1": "bold",
    "3": "italic",
}

def run_command(cmd, stdin=None):
    try:
        proc = subprocess.run(
            cmd,
            input=stdin,
            text=True,
            capture_output=True,
            timeout=TIMEOUT
        )
        return proc
    except subprocess.TimeoutExpired:
        return None

def strip_runner_line(stdout: str, pid: str) -> str:
    lines = stdout.splitlines(keepends=True)
    if lines and lines[0].strip() == f"./build/bin/{pid}":
        return "".join(lines[1:])
    return stdout

def strip_make_error_line(stderr: str) -> str:
    lines = stderr.splitlines(keepends=True)
    filtered_lines = [
        line for line in lines
        if f"make: *** [" not in line
    ]
    return "".join(filtered_lines)

def ansi_to_tokens(text: str):
    spans = []
    current_color = "default"
    current_style = "normal"

    parts = ANSI_PATTERN.split(text)
    #print(parts)
    for part in parts:
        if part.startswith("\x1b["):
            # Strip ESC[ and trailing 'm' or 'K'
            content = part[2:]

            # Ignore clear-line and similar
            if content.endswith("K"):
                continue

            if content.endswith("m"):
                codes = content[:-1].split(";")

                # Reset
                if "0" in codes or "" in codes:
                    current_color = "default"
                    current_style = "normal"
                else:
                    # Pick the *last* meaningful color code
                    for c in reversed(codes):
                        if c in ANSI_COLOR_MAP:
                            current_color = ANSI_COLOR_MAP[c]
                        elif c in ANSI_STYLE_MAP:
                            current_style = ANSI_STYLE_MAP[c]
            continue

        # Payload text
        if part:
            spans.append({
                "color": current_color,
                "style": current_style,
                "text": part
            })

    return spans

def main():
    with open(PROBLEMS_JSON, "r", encoding="utf-8") as f:
        problems = json.load(f)

    generated = []
    problem_index = []

    for problem in problems:
        pid = problem["id"]
        print(f"[+] Processing {pid}")

        # ----------------------
        # Compile
        # ----------------------
        compile_proc = run_command(
            MAKE_CMD + ["problem", f"NAME={pid}"]
        )
        result = None
        if compile_proc is None:
            result = {
                "errorType": "compilation-error",
                "errorMessage": ansi_to_tokens("Compilation timed out")
            }
        elif compile_proc.returncode != 0:
            result = {
                "errorType": "compilation-error",
                "errorMessage": ansi_to_tokens(strip_make_error_line(compile_proc.stderr.strip()))
            }
        else:
            # ----------------------
            # Run
            # ----------------------
            stdin = problem.get("stdin", "")
            run_proc = run_command(
                MAKE_CMD + ["run", f"NAME={pid}"],
                stdin=stdin
            )

            if run_proc is None:
                result = {
                    "errorType": "runtime-error",
                    "errorMessage": ansi_to_tokens("Execution timed out")
                }
            elif run_proc.returncode != 0:
                result = {
                    "errorType": "runtime-error",
                    "errorMessage": run_proc.stderr.strip()
                }
            else:
                if problem.get("UB", False):
                    result = {
                        "errorType": "undefined-behavior",
                    }
                else:
                    clean_stdout = strip_runner_line(
                        run_proc.stdout, pid
                    )
                    result = {
                        "errorType": "no-error",
                        "stdout": clean_stdout
                    }

        generated_problem = dict(problem)
        generated_problem["result"] = result
        generated_problem["code"] = (PROBLEMS_SRC / f"{problem["id"]}.cpp").read_text()
        generated.append(generated_problem)
        problem_index.append({
            "id": generated_problem["id"],
            "difficulty": generated_problem["difficulty"],
            "concepts": generated_problem["concepts"]
        })

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(generated, f, indent=2)
    with open(OUTPUT_JSON_INDEX, "w", encoding="utf-8") as f:
        json.dump(problem_index, f, indent=2)

    print(f"\n✔ Generated {OUTPUT_JSON}, {OUTPUT_JSON_INDEX}")


if __name__ == "__main__":
    sys.exit(main())
