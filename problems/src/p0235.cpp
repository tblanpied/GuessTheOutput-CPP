#include <iostream>
#include <variant>

int main() {
    std::variant<int, char> v = 1;

    auto vis = [](auto x) {
        using T = decltype(x);
        if constexpr (std::is_same_v<T, int>) std::cout << 'i';
        else std::cout << 'c';
    };

    std::visit(vis, v);
    v = 'x';
    std::visit(vis, v);

    std::cout << "\n";
}
