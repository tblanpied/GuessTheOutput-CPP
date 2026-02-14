#include <iostream>

struct T {
    char c;
    explicit T(char x) : c(x) { std::cout << c; }
    ~T() { std::cout << char(c - 'a' + 'A'); }
};

class B2 {
    T e;
    T f;
public:
    B2() : f('f'), e('e') { std::cout << '4'; }
    ~B2() { std::cout << '@'; }
};

class B1 {
    T a;
    T b;
public:
    B1() : b('b'), a('a') { std::cout << '5'; }
    ~B1() { std::cout << '!'; }
};

class D : public B2, public B1 {
    T c;
    T d;
public:
    D() : d('d'), B1(), c('c'), B2() { std::cout << 'g'; }
    ~D() { std::cout << '?'; }
};

int main() {
    D obj;
    std::cout << 'x' << "\n";
}
