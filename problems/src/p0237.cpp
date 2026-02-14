#include <iostream>
#include <utility>

struct S {
    S() { std::cout << '1'; }
    S(const S&) { std::cout << 'c'; }
    S(S&&) noexcept(false) { std::cout << 'm'; }
};

int main() {
    S a;
    S b = std::move_if_noexcept(a);
    (void)b;
    std::cout << "\n";
}
