#include <iostream>

enum class E { A = 1 };

int main() {
    int x = E::A;
    std::cout << x << '\n';
}
