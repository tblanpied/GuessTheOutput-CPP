#include <iostream>

template <class T>
struct B {
    int v = 1;
};

template <class T>
struct D : B<T> {
    void f() { std::cout << v; }
};

int main() {
    D<int> x;
    x.f();
    std::cout << "\n";
}
