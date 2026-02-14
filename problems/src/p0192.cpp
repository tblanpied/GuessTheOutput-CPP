#include <iostream>

struct A {
    A() {
        f();
        std::cout << 'x';
    }
    virtual void f() { std::cout << 'a'; }
    virtual ~A() = default;
};

struct B : A {
    B() { std::cout << 'y'; }
    void f() override { std::cout << 'b'; }
};

int main() {
    B obj;
    std::cout << 'z';
    obj.f();
    std::cout << "\n";
}
