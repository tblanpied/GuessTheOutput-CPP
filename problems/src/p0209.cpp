#include <iostream>

struct B {
    void f(int) { std::cout << 'i'; }
};

struct D : B {
    void f(double) { std::cout << 'd'; }
};

int main() {
    D x;
    x.f(1);
    x.B::f(1);
    std::cout << "\n";
}
