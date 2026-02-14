#include <iostream>

class B {
public:
    virtual void f() { std::cout << 'b'; }
    virtual ~B() { f(); std::cout << '1'; }
};

class D : public B {
public:
    void f() override { std::cout << 'd'; }
    ~D() override { f(); std::cout << '2'; }
};

int main() {
    B* p = new D;
    delete p;
    std::cout << "\n";
}
