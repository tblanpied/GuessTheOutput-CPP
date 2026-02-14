#include <iostream>

class B {
public:
    ~B() { std::cout << 'b'; }
};

class D : public B {
public:
    ~D() { std::cout << 'd'; }
};

int main() {
    B* p = new D;
    delete p;
    std::cout << "\n";
}
