#include <iostream>

struct T {
    char c;
    explicit T(char x) : c(x) { std::cout << c; }
    ~T() { std::cout << char(c - 'a' + 'A'); }
};

T a('a');
T b('b');

int main() {
    std::cout << 'x' << '\n';
}
