#include <iostream>
#include <initializer_list>

struct S {
    S(int) { std::cout << 'i'; }
    S(std::initializer_list<int>) { std::cout << 'l'; }
};

int main() {
    S a(1);
    S b{1};
    S c{1, 2};
    std::cout << "\n";
}
