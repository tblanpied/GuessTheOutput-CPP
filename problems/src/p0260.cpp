#include <iostream>
#include <functional>

class S {
public:
    int v = 1;
    int f(int x) {
        std::cout << (v + x);
        return v + x;
    }
};

int main() {
    S s;
    auto pm = &S::f;

    std::invoke(pm, s, 2);
    std::cout << ' ';
    std::invoke(pm, std::ref(s), 3);

    std::cout << "\n";
}
