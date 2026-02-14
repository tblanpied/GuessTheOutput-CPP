#include <iostream>

struct P {
    char c;
    explicit P(char x) : c(x) { std::cout << c; }
    ~P() {
        if (c >= 'a' && c <= 'z') std::cout << char(c - 'a' + 'A');
        else std::cout << c;
    }
};

class B1 {
    P p;
public:
    B1() : p('a') {}
};

class B2 {
    P p;
public:
    B2() : p('b') {}
};

class D : public B2, public B1 {
    P m1;
    P m2;
public:
    D() : m2('d'), B1(), m1('c'), B2() { std::cout << 'e'; }
    ~D() { std::cout << 'f'; }
};

int main() {
    D d;
    std::cout << 'x' << '\n';
}
