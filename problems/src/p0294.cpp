#include <iostream>

template <class T>
void f(T) { std::cout << 'p'; }

template <>
void f<int>(int) { std::cout << 'i'; }

int main() {
    f(1);
    f('x');
    std::cout << "\n";
}
