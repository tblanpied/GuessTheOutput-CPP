#include <iostream>

void f(int, int) {}

int main() {
    int i = 0;
    f(i++, i++);
    std::cout << i << "\n";
}
