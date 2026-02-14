#include <iostream>
#include <utility>

struct S {
    void f() &  { std::cout << "L"; }
    void f() && { std::cout << "R"; }
};

int main() {
    S s;
    s.f();
    std::move(s).f();
    std::cout << "\n";
}
