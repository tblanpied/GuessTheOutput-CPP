#include <iostream>

void f(int) {}
void f(double) {}

int main() {
    auto p = &f;
    (void)p;
    std::cout << "x\n";
}
