#include <iostream>

template <int N>
struct S { };

int main() {
    int n = 3;
    S<n> x;
    (void)x;
    std::cout << n << '\n';
}
