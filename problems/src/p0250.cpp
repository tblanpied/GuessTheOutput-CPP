#include <iostream>

template <class... Ts>
int sum(Ts... xs) {
    int r = 0;
    ((r += xs), ...);
    return r;
}

int main() {
    std::cout << sum(1, 2, 3) << "\n";
}
