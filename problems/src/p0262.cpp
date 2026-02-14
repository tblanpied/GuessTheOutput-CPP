#include <iostream>

class S {
    const int v;
public:
    explicit S(int x) : v(x) {}
};

int main() {
    S a(1), b(2);
    a = b;
    std::cout << "x\n";
}
