#include <iostream>
#include <memory>
#include <utility>

int main() {
    std::unique_ptr<int> p(new int(1));
    std::unique_ptr<int> q = std::move(p);

    std::cout << (p ? 1 : 0) << (q ? 1 : 0) << "\n";
}
