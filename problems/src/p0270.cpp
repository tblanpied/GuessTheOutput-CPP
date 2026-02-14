#include <array>
#include <iostream>

int main() {
    std::array<int, 3> a{1, 2, 3};
    auto b = a;

    b[0] = 9;

    std::cout << a[0] << b[0] << "\n";
}
