#include <iostream>
#include <vector>

struct S {
    S() { std::cout << 'a'; }
    S(const S&) { std::cout << 'c'; }
    ~S() { std::cout << 'd'; }
};

int main() {
    std::vector<S> v;
    v.push_back(S{});

    std::cout << 'x' << "\n";
}
