#include <iostream>

void f(int) { std::cout << 'i'; }
void f(const char*) { std::cout << 'p'; }

int main() {
    f(0);
    f(nullptr);
    std::cout << "\n";
}
