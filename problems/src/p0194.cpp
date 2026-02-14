#include <iostream>

int x = 1;

decltype(auto) r() { return (x); }
auto v() { return (x); }

int main() {
    r() = 5;
    std::cout << x << v() << "\n";
}
