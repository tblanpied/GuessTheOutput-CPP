#include <iostream>

constexpr int k() { return 1 + 2; }

int main() {
    switch (k()) {
        case 3: std::cout << 'a'; break;
        default: std::cout << 'b'; break;
    }
    std::cout << "\n";
}
