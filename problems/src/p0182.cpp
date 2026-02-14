#include <iostream>

struct X {
    X(char c) { std::cout << c; }
};

struct A {
    X a;
    X b;
    A() : b('b'), a('a') {}
};

int main() {
    A obj;
    std::cout << "\n";
}
