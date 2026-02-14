#include <iostream>

class B {
public:
    virtual void f() const {}
};

class D : public B {
public:
    void f() override {}
};

int main() {
    std::cout << "x\n";
}
