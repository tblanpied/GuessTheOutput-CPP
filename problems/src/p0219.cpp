#include <iostream>

struct P {
    char c;
    explicit P(char x) : c(x) { std::cout << c; }
    ~P() {
        if (c >= 'a' && c <= 'z') std::cout << char(c - 'a' + 'A');
        else std::cout << c;
    }
};

class S {
    P a;
    P b;
    P c;
public:
    S() : c('c'), a('a'), b('b') { std::cout << 'x'; }
    ~S() { std::cout << 'y'; }
};

int main() {
    S s;
    std::cout << "\n";
}
