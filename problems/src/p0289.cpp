#include <iostream>

int f() { return 1; }

int main() {
    const int x = f();

    switch (0) {
        case x:
            break;
    }

    std::cout << x << '\n';
}
