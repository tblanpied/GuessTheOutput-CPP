#include <iostream>

class S {
public:
    void f() { std::cout << 'n'; }
    void f() const { std::cout << 'c'; }
};

int main() {
    S s;
    const S& r = s;

    s.f();
    r.f();
    std::cout << "\n";
}
