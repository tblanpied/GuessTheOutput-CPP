# Compiler and flags
CXX      := g++
CXXFLAGS := -std=c++17 -O2 -DNDEBUG \
            -Wall -Wextra -Wpedantic \
            -Wconversion -Wsign-conversion \
			-fdiagnostics-color=always

# Directories
SRC_DIR  := src
BIN_DIR  := build

# Autodetect all .cpp files and derive problem names (without .cpp)
SRC_FILES := $(wildcard $(SRC_DIR)/*.cpp)
PROBLEMS  := $(notdir $(basename $(SRC_FILES)))

# Default target: build all detected problems
.PHONY: all
all: $(PROBLEMS:%=$(BIN_DIR)/%)

# Pattern rule: build one problem from its .cpp
$(BIN_DIR)/%: $(SRC_DIR)/%.cpp | $(BIN_DIR)
	$(CXX) $(CXXFLAGS) -o $@ $<

# Ensure build directory exists
$(BIN_DIR):
	mkdir -p $(BIN_DIR)

# Build a single problem by name
# Usage: make problem NAME=p002
.PHONY: problem
problem: $(BIN_DIR)/$(NAME)

# Run a specific problem (builds if needed, then executes)
# Usage: make run NAME=p002
.PHONY: run
run: $(BIN_DIR)/$(NAME)
	./$(BIN_DIR)/$(NAME)

# Run all problems (builds all first, then runs each)
.PHONY: run-all
run-all: all
	@for prob in $(PROBLEMS); do \
		echo "=== Running $$prob ==="; \
		./$(BIN_DIR)/$$prob; \
		echo ""; \
	done

# List detected problems (nice for debugging)
.PHONY: list
list:
	@echo "Detected problems: $(PROBLEMS)"

# Clean
.PHONY: clean
clean:
	rm -rf $(BIN_DIR)
