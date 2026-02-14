#include <iostream>
#include <vector>

struct B {
    virtual ~B() = default;
    virtual void f() { std::cout << 'b'; }
};

struct D : B {
    void f() override { std::cout << 'd'; }
};

int main() {
    std::vector<B> v;
    v.push_back(D{});

    for (auto x : v) x.f();
    for (auto& x : v) x.f();

    std::cout << "\n";
}
