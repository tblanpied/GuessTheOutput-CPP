#include <iostream>

struct P {
    char c;
    explicit P(char x) : c(x) { std::cout << c; }
    ~P() {
        if (c >= 'a' && c <= 'z') std::cout << char(c - 'a' + 'A');
        else std::cout << c;
    }
};

class B {
    P b;
public:
    B() : b('b') {
        std::cout << '1';
        throw 0;
    }
    ~B() { std::cout << '2'; }
};

class D : public B {
    P d;
public:
    D() : d('d') { std::cout << '3'; }
    ~D() { std::cout << '4'; }
};

int main() {
    try {
        D obj;
        std::cout << 'x';
    } catch (...) {
        std::cout << 'y';
    }
    std::cout << "\n";
}
