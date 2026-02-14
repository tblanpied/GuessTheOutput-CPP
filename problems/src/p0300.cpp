#include <iostream>

auto make() {
    int x = 1;
    return [&]() { return x; };
}

int main() {
    auto f = make();
    std::cout << f() << "\n";
}
