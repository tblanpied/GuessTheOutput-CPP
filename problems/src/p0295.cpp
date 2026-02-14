#include <iostream>

struct B {
    virtual ~B() = default;
    virtual void g() { std::cout << 'b'; }
};

struct D : B {
    void g() override { std::cout << 'd'; }
};

int main() {
    try {
        throw D{};
    } catch (B b) {
        b.g();
    }

    try {
        throw D{};
    } catch (B& b) {
        b.g();
    }

    std::cout << "\n";
}
