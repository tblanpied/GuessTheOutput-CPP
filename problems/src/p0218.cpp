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
    P a{'a'};
    P b{'b'};
public:
    S() : b('x') { std::cout << '1'; }
    ~S() { std::cout << '2'; }
};

int main() {
    S s;
    std::cout << 'z' << '\n';
}
