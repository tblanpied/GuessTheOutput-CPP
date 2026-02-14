#include <iostream>
#include <utility>

struct S {
    S() { std::cout << 'a'; }
    S(const S&) { std::cout << 'c'; }
    S(S&&) { std::cout << 'm'; }
};

int main() {
    const S s;
    S t = std::move(s);
    (void)t;

    std::cout << "\n";
}
