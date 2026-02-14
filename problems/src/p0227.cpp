#include <iostream>
#include <optional>

int main() {
    std::optional<int> o;

    std::cout << o.value_or(3);
    o.emplace(4);
    std::cout << o.value_or(3) << "\n";
}
