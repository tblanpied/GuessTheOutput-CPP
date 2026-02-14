#include <iostream>
#include <memory>

class B {
public:
    virtual ~B() { std::cout << 'b'; }
};

class D : public B {
public:
    ~D() override { std::cout << 'd'; }
};

int main() {
    std::unique_ptr<B> p = std::make_unique<D>();
    std::cout << 'x' << "\n";
}
