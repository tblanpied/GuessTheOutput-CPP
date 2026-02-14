#include <iostream>

class S {
    int& r;
public:
    explicit S(int& x) : r(x) {}
};

int main() {
    int a = 1, b = 2;
    S x(a), y(b);
    x = y;
    std::cout << a << ' ' << b << '\n';
}
