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
public:
    S(int) : b('b'), a('a') { std::cout << '1'; }
    S() : S(0) { std::cout << '2'; }
    ~S() { std::cout << '3'; }
};

int main() {
    S s;
    std::cout << 'x' << '\n';
}
