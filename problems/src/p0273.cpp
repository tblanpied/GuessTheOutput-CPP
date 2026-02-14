#include <iostream>
#include <initializer_list>

struct S {
    S(int, int) { std::cout << 'p'; }
    S(std::initializer_list<int>) { std::cout << 'l'; }
};

int main() {
    S a(1, 2);
    S b{1, 2};
    std::cout << "\n";
}
