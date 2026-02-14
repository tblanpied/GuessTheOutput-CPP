#include <iostream>

struct P {
    char c;
    explicit P(char x) : c(x) { std::cout << c; }
    ~P() {
        if (c >= 'a' && c <= 'z') std::cout << char(c - 'a' + 'A');
        else std::cout << c;
    }
};

struct Q {
    char c;
    explicit Q(char x) : c(x) {
        std::cout << c;
        throw 1;
    }
};

class S {
    P a;
    Q b;
    P c;
public:
    S() : c('c'), b('b'), a('a') { std::cout << 's'; }
};

int main() {
    try {
        S s;
        std::cout << 'x';
    } catch (...) {
        std::cout << 'm';
    }
    std::cout << "\n";
}
