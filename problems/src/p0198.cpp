#include <iostream>

struct S {
    S() { std::cout << 'a'; }
    ~S() { std::cout << 'b'; }
};

int main() {
    const S& r = S();
    (void)r;

    std::cout << 'c' << "\n";
}
