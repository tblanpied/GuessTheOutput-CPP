#include <iostream>
#include <memory>
#include <utility>

int main() {
    std::unique_ptr<int> p(new int(1));

    auto f = [q = std::move(p)]() {
        std::cout << (q ? 1 : 0);
    };

    std::cout << (p ? 1 : 0);
    f();
    std::cout << "\n";
}
