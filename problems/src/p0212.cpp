#include <iostream>

class M {
    char c;
public:
    explicit M(char x) : c(x) { std::cout << c; }
    ~M() { std::cout << c; }
};

class B {
    M m1;
public:
    B() : m1('a') { std::cout << 'b'; }
    ~B() { std::cout << 'B'; }
};

class D : public B {
    M m2;
public:
    D() : m2('c') { std::cout << 'd'; }
    ~D() { std::cout << 'D'; }
};

int main() {
    D obj;
    std::cout << 'x' << "\n";
}
