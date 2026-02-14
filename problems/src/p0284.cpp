#include <iostream>
#include <tuple>

int main() {
    std::tuple<int, int> t{1, 2};

    auto& [x, y] = t;
    x = 7;

    std::cout << std::get<0>(t) << y << "\n";
}
