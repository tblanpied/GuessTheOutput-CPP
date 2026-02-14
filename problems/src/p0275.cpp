#include <iostream>

int f() { return 3; }

template <int N>
struct S { };

int main() {
    S<f()> x;
    (void)x;
    std::cout << "x\n";
}
