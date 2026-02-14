#include <iostream>
#include <utility>

int main() {
    std::pair<int, int> p{1, 2};

    auto [a, b] = p;
    b = 5;

    std::cout << p.second << b << "\n";
}
