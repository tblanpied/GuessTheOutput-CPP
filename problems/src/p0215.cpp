#include <iostream>

struct P {
    char c;
    explicit P(char x) : c(x) { std::cout << c; }
    ~P() {
        if (c >= 'a' && c <= 'z') std::cout << char(c - 'a' + 'A');
        else std::cout << c;
    }
};

class V {
    P p;
public:
    explicit V(char c) : p(c) {}
};

class L : virtual public V {
    P l;
public:
    L() : V('x'), l('l') { std::cout << '1'; }
};

class R : virtual public V {
    P r;
public:
    R() : V('y'), r('r') { std::cout << '2'; }
};

class M : public L, public R {
    P m;
public:
    M() : V('v'), R(), m('m'), L() { std::cout << '3'; }
    ~M() { std::cout << '4'; }
};

int main() {
    M obj;
    std::cout << 'z' << '\n';
}
