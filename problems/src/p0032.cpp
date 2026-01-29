#include <iostream>

int main() {
    [[maybe_unused]] int a { 7 };
    [[maybe_unused]] int b { 9 };
    std::cout << "Hello";
    return 0;
}
