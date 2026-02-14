#include <iostream>

struct B {
    void f(int)  { std::cout << 'i'; }
    void f(char) { std::cout << 'c'; }
};

struct D1 : B {
    void f(double) { std::cout << 'd'; }
};

struct D2 : B {
    using B::f;
    void f(double) { std::cout << 'd'; }
};

int main() {
    D1 a;
    D2 b;

    a.f('x');
    b.f('x');

    std::cout << "\n";
}
