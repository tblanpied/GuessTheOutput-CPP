#include <iostream>

int main() {
    int a[2]{1, 2};

    auto [x, y] = a;
    auto& [r1, r2] = a;

    r1 = 7;

    std::cout << x << y << ' ' << a[0] << a[1] << "\n";
}
